import { useCallback, useEffect, useState } from "react";
import { getConversationByUserId } from "../service/message/message.service";
import { ConversationDto } from "../types/Message.type";

type Props = {
    id: string;
    refresh: boolean;
}

export default function useGetConversationById(props: Props) {
    const { id, refresh } = props;
    const [conversation, setConversation] = useState<ConversationDto[]>([])

    const sendRequest = useCallback(async () => {
        try {
            const resp = await getConversationByUserId(id as string);
            
            setConversation(resp);
        } catch (error) {
            console.log(error)
        }
    }, [id])

    useEffect(() => {
        sendRequest()
    }, [id, refresh])

    return {
        conversation,
        setConversation
    }

}