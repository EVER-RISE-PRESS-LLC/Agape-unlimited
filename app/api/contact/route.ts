import { getCloudflareContext } from '@opennextjs/cloudflare';
import contactWorker from '@/worker';
export const dynamic = 'force-dynamic';
async function handle(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  return contactWorker.fetch(request, env);
}
export { handle as GET, handle as POST, handle as DELETE, handle as PUT, handle as PATCH, handle as OPTIONS };
