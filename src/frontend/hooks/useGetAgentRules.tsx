import { useActor } from '@/actor';
import { useQuery } from '@tanstack/react-query';
import useHandleAgentError from './useHandleAgentError';
import { useInternetIdentity } from 'ic-use-internet-identity';

export default function useGetAgentRules() {
  const { actor: backend } = useActor();
  const { handleAgentError } = useHandleAgentError();
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal();

  return useQuery({
    queryKey: ['get_agent_rules', principal],
    queryFn: async () => {
      if (!principal) {
        throw new Error('Principal is required.');
      }

      try {
        const result = await backend?.get_agent_rules();

        if (result === undefined) {
          throw new Error('Undefined result returned.');
        }

        if ('Err' in result) {
          throw new Error(result.Err);
        }

        return result.Ok[0] || null;
      } catch (e) {
        handleAgentError(e);
        console.error(e);
        throw e;
      }
    },
    enabled: !!backend && !!principal,
  });
}
