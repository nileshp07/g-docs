import {auth} from '@clerk/nextjs/server';
import {preloadQuery} from 'convex/nextjs';

import {Id} from '../../../../convex/_generated/dataModel';
import {Document} from './document';
import {api} from '../../../../convex/_generated/api';

interface DocumentIdPageProps {
	params: Promise<{documentId: Id<'documents'>}>;
}
const DocumentIdPage = async ({params}: DocumentIdPageProps) => {
	const {documentId} = await params;

	const {getToken} = await auth();
	const token = (await getToken({template: 'convex'})) ?? undefined;

	if (!token) {
		throw new Error('Unauthorized');
	}

	const preloadeddocument = await preloadQuery(api.documents.getById, {id: documentId}, {token});

	if (!preloadeddocument) {
		throw new Error('Document not found');
	}

	return <Document preloadedDocument={preloadeddocument} />;
};

export default DocumentIdPage;
