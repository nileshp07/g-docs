'use client';

import {ReactNode} from 'react';
import {LiveblocksProvider, RoomProvider, ClientSideSuspense} from '@liveblocks/react/suspense';
import {useParams} from 'next/navigation';

export function Room({children}: {children: ReactNode}) {
	const param = useParams();

	return (
		<LiveblocksProvider publicApiKey={'pk_dev_D9VJN4aNXoKfy5Gs3aIo9pe0AW-wW6lP4XlMfN8JGoymG9YFujWfug5gAsdMOYFB'}>
			<RoomProvider id={param.documentId as string}>
				<ClientSideSuspense fallback={<div>Loading…</div>}>{children}</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
