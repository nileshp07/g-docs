import {ExternalLink, FilePenIcon, MoreVertical, TrashIcon} from 'lucide-react';

import {Id} from '../../../convex/_generated/dataModel';

import {Button} from '@/components/ui/button';
import {RemoveDialog} from '@/components/remove-dialog';
import {RenameDialog} from '@/components/rename-dialog';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';

interface DocumentMenuProps {
	documentId: Id<'documents'>;
	title: string;
	onNewTab: (id: string) => void;
}

export const DocumentMenu = ({documentId, title, onNewTab}: DocumentMenuProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={'ghost'} size={'icon'} className='rounded-full'>
					<MoreVertical className='size-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<RenameDialog documentId={documentId} initialTitle={title}>
					<DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
						<FilePenIcon className='size-4 mr-2' />
						Rename
					</DropdownMenuItem>
				</RenameDialog>
				<RemoveDialog documentId={documentId}>
					<DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
						<TrashIcon className='size-4 mr-2' />
						Remove
					</DropdownMenuItem>
				</RemoveDialog>
				<DropdownMenuItem onClick={() => onNewTab(documentId)}>
					<ExternalLink className='size-4 mr-2' />
					Open in a new tab
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
