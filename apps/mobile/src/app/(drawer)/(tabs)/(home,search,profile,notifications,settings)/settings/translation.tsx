import { useTranslations } from 'use-intl';
import { usePreferences } from '~/stores/preferences';
import { Menu } from '~/components/common/menu';
import { TextBox } from '~/components/common/text-box';
import { Slider } from '~/components/common/slider';
import { View } from '~/components/common/view';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function Screen() {
  const t = useTranslations('screen.settings.translation');
  const { styles } = useStyles(stylesheet);

  const {
    llmApiKey,
    llmApiEndpoint,
    llmModel,
    llmSystemPrompt,
    llmTemperature,
    update,
  } = usePreferences();

  return (
    <Menu
      items={[
        t('title'),
        function Component() {
          return (
            <View style={styles.container}>
              <TextBox
                label={t('llmApiEndpoint.label')}
                hint={t('llmApiEndpoint.hint')}
                value={llmApiEndpoint}
                onChangeText={(value) => update({ llmApiEndpoint: value })}
              />
              <TextBox
                label={t('llmApiKey.label')}
                hint={t('llmApiKey.hint')}
                value={llmApiKey}
                onChangeText={(value) => update({ llmApiKey: value })}
                secureTextEntry
              />
              <TextBox
                label={t('llmModel.label')}
                hint={t('llmModel.hint')}
                value={llmModel}
                onChangeText={(value) => update({ llmModel: value })}
              />
              <TextBox
                label={t('llmSystemPrompt.label')}
                hint={t('llmSystemPrompt.hint')}
                value={llmSystemPrompt}
                onChangeText={(value) => update({ llmSystemPrompt: value })}
                multiline
              />
              <Slider
                label={t('llmTemperature.label', { value: llmTemperature.toFixed(2) })}
                min={0}
                max={2}
                step={0.1}
                value={llmTemperature}
                onChange={(value) => update({ llmTemperature: value })}
              />
            </View>
          );
        },
      ]}
    />
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    gap: theme.space[4],
    padding: theme.space[4],
  },
}));
