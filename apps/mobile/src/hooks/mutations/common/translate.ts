import { useMutation } from '@tanstack/react-query';
import { usePreferences } from '~/stores/preferences';
import { updatePost } from '~/hooks/queries/posts/post';
import { toast } from 'sonner-native';

type Variables = {
  id: string;
  text: string;
  target: 'post' | 'comment';
  type: 'title' | 'body';
  postId: string;
};

type TranslateResponse = {
  choices: {
    message: {
      content: string;
    };
  }[];
};

export function useTranslate() {
  const { llmApiEndpoint, llmApiKey, llmModel, llmTemperature, llmSystemPrompt } = usePreferences();

  const { isPending, mutate } = useMutation<string, Error, Variables>({
    mutationFn: async ({ text }) => {
      const endpoint = llmApiEndpoint || 'https://api.openai.com/v1/chat/completions';
      const key = llmApiKey;

      if (!key) {
        toast.error('LLM API key not configured.');
        throw new Error('LLM API key not configured.');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: llmModel || 'gpt-3.5-turbo',
          temperature: llmTemperature || 0.7,
          messages: [
            {
              role: 'system',
              content: llmSystemPrompt || 'You are a translator. Translate the following text to English. Preserve the Markdown formatting.',
            },
            {
              role: 'user',
              content: text,
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        const message = error.error.message || `HTTP error! status: ${response.status}`;
        toast.error(message);
        throw new Error(message);
      }

      const data: TranslateResponse = await response.json();

      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        return data.choices[0].message.content;
      }

      throw new Error('Invalid API response format.');
    },
    onSuccess: (translatedText, variables) => {
        updatePost(variables.postId, (draft) => {
            if (variables.target === 'post') {
                if (variables.type === 'title') {
                    draft.post.translatedTitle = translatedText;
                } else {
                    draft.post.translatedBody = translatedText;
                }
            } else {
                for (const comment of draft.comments) {
                    if (comment.type === 'reply' && comment.data.id === variables.id) {
                        comment.data.translatedBody = translatedText;
                        break;
                    }
                }
            }
        });
    }
  });

  const revert = (variables: Omit<Variables, 'text' | 'type'>) => {
    updatePost(variables.postId, (draft) => {
        if (variables.target === 'post') {
            draft.post.translatedTitle = undefined;
            draft.post.translatedBody = undefined;
        } else {
            for (const comment of draft.comments) {
                if (comment.type === 'reply' && comment.data.id === variables.id) {
                    comment.data.translatedBody = undefined;
                    break;
                }
            }
        }
    });
  }

  return {
    isTranslating: isPending,
    translate: mutate,
    revert,
  };
}
