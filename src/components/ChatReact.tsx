import { AIConversation } from '@aws-amplify/ui-react-ai'
import { useAIConversation } from '../AiClient';

function ChatReact() {
    // Truyền id cố định để giữ conversation
    const [state, sendMessage] = useAIConversation('chat', { id: 'default-chat' });
    const { data: { messages }, errors, isLoading } = state;

    if (errors) {
        return <div>Error: {errors[0]?.message}</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <h1>Hello to the awesome AI Chat!! - With Amplify React components</h1><br />
            <AIConversation
                messages={messages}
                handleSendMessage={sendMessage}
                isLoading={isLoading}
            />
        </main>
    );
}

export default ChatReact;