'use client';

import React, {useState} from 'react';
import {toast} from 'sonner';
import {useMutation} from 'convex/react';

import {Id} from '../../convex/_generated/dataModel';
import {api} from '../../convex/_generated/api';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from '@/components/ui/dialog';
import {Input} from './ui/input';
import {Button} from './ui/button';

interface RenameDialogProps {
	documentId: Id<'documents'>;
	initialTitle: string;
	children: React.ReactNode;
}

export const RenameDialog = ({documentId, initialTitle, children}: RenameDialogProps) => {
	const update = useMutation(api.documents.updateById);
	const [isUpdating, setIsUpdating] = useState(false);

	const [title, setTitle] = useState(initialTitle);
	const [open, setOpen] = useState(false);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsUpdating(true);

		update({id: documentId, title: title.trim() || 'Untitled'})
			.then(() => {
				toast.success('Document Renamed');
				setOpen(false);
			})
			.catch(() => toast.error('Something went wrong'))
			.finally(() => {
				setIsUpdating(false);
			});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent onClick={(e) => e.stopPropagation()}>
				<form onSubmit={onSubmit}>
					<DialogHeader>
						<DialogTitle>Rename Document</DialogTitle>
						<DialogDescription>Enter a new name for this document</DialogDescription>
					</DialogHeader>
					<div className='my-4'>
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder='Document name'
							onClick={(e) => e.stopPropagation()}
						/>
					</div>
					<DialogFooter>
						<Button
							type='button'
							variant={'ghost'}
							disabled={isUpdating}
							onClick={(e) => {
								e.stopPropagation();
								setOpen(false);
							}}
						>
							Cancel
						</Button>
						<Button type='submit' disabled={isUpdating} onClick={(e) => e.stopPropagation()}>
							Save
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
