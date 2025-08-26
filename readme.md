<img src="apps/mobile/assets/artwork/acorn.png" width="128" />

# Acorn

Reddit for mobile

- [Website](https://acorn.blue/)
- [TestFlight](https://testflight.apple.com/join/uKWP3MFB)

## Building the app

This guide will walk you through building the iOS app on a macOS machine.

### Prerequisites

- A macOS machine.
- [Node.js](https://nodejs.org/) (v18 or higher).
- [Bun](https://bun.sh/) package manager.
- [Xcode](https://developer.apple.com/xcode/) and the Xcode Command Line Tools.
- [Watchman](https://facebook.github.io/watchman/) (recommended for React Native).
- An [Apple Developer Account](https://developer.apple.com/account/) is required for code signing.

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/acorn-app/acorn.git
    cd acorn
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Install EAS CLI:**
    The project uses Expo Application Services (EAS) to build the app. You'll need to install the EAS CLI globally.
    ```bash
    bun add -g eas-cli
    ```

### Configuration

1.  **Log in to your Expo account:**
    If you don't have an Expo account, you can create one for free.
    ```bash
    eas login
    ```

2.  **Log in to your Apple Developer account:**
    EAS CLI will need access to your Apple Developer account to manage code signing.
    ```bash
    eas device:create
    ```
    This command will guide you through the process of registering your device with your Apple Developer account.

### Building

1.  **Navigate to the mobile app directory:**
    ```bash
    cd apps/mobile
    ```

2.  **Run the build command:**
    This command will start the build process on your local machine. It will create a production build for iOS.
    ```bash
    bun run build
    ```
    The build process may take a while. It will prompt you for your Apple ID credentials and handle code signing automatically.

### Output

Once the build is complete, the EAS CLI will output the path to the generated `.ipa` file. You can then use this file to install the app on a registered device or upload it to TestFlight.
