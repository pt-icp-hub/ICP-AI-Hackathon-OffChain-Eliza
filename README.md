# 🛠️🤖 OffChain AI with Eliza

This repository provides an example of how to build an **off-chain AI agent** using **Eliza** that can seamlessly interact with the **Internet Computer (IC)**. The agent operates off-chain but is capable of securely executing blockchain-related tasks via ICP canisters.

## ✨ Overview

- **Uses the Eliza AI Agent Framework**: Enables AI-driven automation with defined security rules.
- **Interacts with the Internet Computer (IC)**: Communicates with IC-based Ethereum wallets without exposing private keys.
- **Secure Transactions**: Implements rules to prevent unauthorized actions, making AI-driven blockchain interactions safer.
- **Network Compatibility**: This project is designed to work exclusively with Sepolia ETH to ensure a stable and controlled testing environment.
- **Customizable**: Developers can modify the agent’s behavior, transaction limits, and interaction flow.

### Original Demo & Technology Stack
- This project is based on the original demo from [Kristofer Lund](https://github.com/kristoferlund).
- The backend consists of a **Rust canister** using the [ic-alloy](https://github.com/ic-alloy) library to interact with the Ethereum blockchain.
- The frontend is built with **React and Vite**.

---

## 🚀 Getting Started

### 1. Prerequisites

1. **DFX SDK**: Install the [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove).
2. **Node.js (Version 22.14.0+)**: Ensure you have at least Node.js v22.14.0. You can install it using:
   - [NVM](https://github.com/nvm-sh/nvm):
     ```bash
     nvm install 22.14.0
     nvm use 22.14.0
     ```

3. **PNPM**: Install [PNPM](https://pnpm.io/installation) for package management.

---

## 2. Deploy the Ethereum Wallet

1. **Clone the Repo**: 
   ```bash
   git clone https://github.com/kristoferlund/ic-eliza-eth-wallet.git
   cd ic-eliza-eth-wallet
   ```

2. **Setup Environment Variables**:
   ```bash
   echo "VITE_ETHERSCAN_API_KEY=YOUR_API_KEY" > .env.local
   ```
   You can obtain an [Etherscan API key](https://etherscan.io/apis) for free.

3. **Deploy the Wallet**:
   ```bash
   pnpm install  # Install dependencies
   dfx start --clean --background  # Start the IC replica
   dfx deploy  # Deploy the wallet canister
   ```

After deployment, you can access the wallet’s UI via the generated frontend URL.

---

## 3. Deploy the AI Agent

1. **Clone the Repo**:
   ```bash
   git clone https://github.com/kristoferlund/ic-eliza-eth-wallet-agent.git
   cd ic-eliza-eth-wallet-agent
   ```

2. **Setup Environment Variables**:
   Before running the agent, configure your `.env` file:
   ```bash
   INTERNET_COMPUTER_PRIVATE_KEY=your_private_key_here
   IC_ETH_WALLET_CANISTER=your_canister_id_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   - **`INTERNET_COMPUTER_PRIVATE_KEY`**: The private key that allows the AI agent to interact with ICP canisters securely.
   - **`IC_ETH_WALLET_CANISTER`**: The deployed canister ID for the Ethereum wallet on ICP.
   - **`OPENAI_API_KEY`**: Required to enable AI interactions through OpenAI’s models.

   To generate an Internet Computer private key, follow these steps:
   ```bash
   dfx identity new ai_agent_identity --storage-mode=plaintext
   dfx identity export ai_agent_identity > ai_agent_identity.pem
   ```
   Extract the raw private key:
   ```bash
   dfx identity export ai_agent_identity | openssl ec -text -noout | grep -A 3 priv: | tail -n +2 | tr -d '[:space:]:' | tr -d '\n'
   ```
   Copy and paste this private key into your `.env` file.

3. **Run the AI Agent**:
   ```bash
   pnpm install  # Install dependencies
   bash ./scripts/start.sh  # Start the agent
   ```

Once running, you can interact with the AI agent using natural language commands.

Press **Enter** to begin interacting with the agent.

Example prompts:
```bash
What is my Ethereum address?
Check my ETH balance.
Send 0.0001 ETH to 0x0000000000000000000000000000000000000000
```

---

## 🏗 Project Structure

```
ICP-AI-Hackathon-OffChain-Eliza/
├── src
│   ├── agent
│   │   ├── index.ts       # AI agent logic
│   │   ├── actions
│   │   │   ├── getAddress.ts  # Fetches Ethereum address
│   │   │   ├── getBalance.ts  # Retrieves ETH balance
│   │   │   ├── sendEth.ts     # Processes ETH transactions
│   ├── config
│   │   ├── env.ts        # Loads environment variables
├── .env.example         # Environment variable template
├── package.json         # Project dependencies
├── README.md            # You are here
```

---

## 🔐 Security Features

To ensure safe AI-driven transactions, the wallet enforces:

1. **Transaction Limits**: Maximum amount per transaction.
2. **Cooldown Periods**: Minimum wait time between transactions.
3. **Identity Verification**: Ensures only authorized agents can send transactions.

---

## 🤝 Contributing

We welcome contributions! Open issues or submit pull requests to improve this template. Join the [IC Developer Community](https://forum.dfinity.org/) for discussions and support.

---

## 📚 Learn More

- [Eliza AI Framework](https://github.com/elizaOS/eliza)
- [Internet Computer Documentation](https://internetcomputer.org/docs/home)

---

**Happy hacking!** 🚀 Build your own off-chain AI agent and explore the limitless potential of AI-powered blockchain interactions!
