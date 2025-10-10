import React from 'react';

import { PlayIcon } from 'lucide-react';
import { AccentButton } from '@/common/components';
import { usePipecatClient, usePipecatClientTransportState } from '@pipecat-ai/client-react';

type InterviewStartProps = {
  setInterviewStatus: (status: 'notStarted' | 'ongoing' | 'ended') => void;
};

export const InterviewStart = ({ setInterviewStatus }: InterviewStartProps) => {
  const client = usePipecatClient();
  const transportState = usePipecatClientTransportState();
  const isConnected = ['connected', 'ready'].includes(transportState);

  const handleClick = async () => {
    if (!client) {
      console.error('Pipecat client is not initialized');
      return;
    }

    setInterviewStatus('ongoing');
    try {
      if (isConnected) {
        await client.disconnect();
      } else {
        await client.connect({
          webrtcUrl: 'http://localhost:7860/api/offer',
        });
      }
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  return (
    <div className="my-auto flex flex-col items-center gap-4">
      <p className="px-4 text-center">Click &quot;Start Interview&quot; button to begin your interview.</p>
      <p className="text-balance border-b border-current text-center text-sm text-muted-foreground">
        Ensure your microphone is enabled for the best experience.
      </p>

      <AccentButton
        className="mt-2 w-full"
        onClick={handleClick}
        disabled={!client || ['connecting', 'disconnecting'].includes(transportState)}
      >
        <PlayIcon className="mr-2 size-4" />
        Start Interview
      </AccentButton>
    </div>
  );
};
