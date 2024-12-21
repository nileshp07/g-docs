'use client';

import React, {useState} from 'react';

import {cn} from '@/lib/utils';

import {type Level} from '@tiptap/extension-heading';
import {type ColorResult, SketchPicker} from 'react-color';

import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {useEditorStore} from '@/store/use-editor-store';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {
	AlignCenterIcon,
	AlignJustifyIcon,
	AlignLeftIcon,
	AlignRightIcon,
	BoldIcon,
	ChevronDownIcon,
	HighlighterIcon,
	ImageIcon,
	ItalicIcon,
	Link2Icon,
	ListIcon,
	ListOrderedIcon,
	ListTodoIcon,
	LucideIcon,
	MessageSquarePlus,
	PrinterIcon,
	Redo2Icon,
	RemoveFormattingIcon,
	SearchIcon,
	SpellCheckIcon,
	UnderlineIcon,
	Undo2Icon,
	UploadIcon,
	MinusIcon,
	PlusIcon,
	ListCollapseIcon,
} from 'lucide-react';

const LineHeightButton = () => {
	const {editor} = useEditorStore();

	const lineHeights = [
		{label: 'Default', value: 'normal'},
		{label: 'Single', value: '1'},
		{label: '1.15', value: '1.15'},
		{label: '1.5', value: '1.5'},
		{label: 'Double', value: '2'},
	];

	return (
		<TooltipProvider>
			<DropdownMenu>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
								<ListCollapseIcon />
							</button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<span className='text-xs'>Line Height</span>
					</TooltipContent>
				</Tooltip>

				<DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
					{lineHeights.map(({label, value}) => (
						<button
							key={value}
							onClick={() => editor?.chain().focus().setLineHeight(value).run()}
							className={cn(
								'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
								editor?.getAttributes('paragraph').lineHeight === value && 'bg-neutral-200/80'
							)}
						>
							<span className='text-sm'>{label}</span>
						</button>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</TooltipProvider>
	);
};

const FontSizeButton = () => {
	const {editor} = useEditorStore();

	const currentFontSize = editor?.getAttributes('textStyle').fontSize
		? editor?.getAttributes('textStyle').fontSize.replace('px', '')
		: '16';

	const [fontSize, setFontSize] = useState(currentFontSize);
	const [inputValue, setInputValue] = useState(fontSize);
	const [isEditing, setIsEditing] = useState(false);

	const updateFontSize = (newSize: string) => {
		const size = parseInt(newSize);

		if (!isNaN(size) && size >= 0) {
			editor?.chain().focus().setFontSize(`${size}px`).run();
			setFontSize(newSize);
			setInputValue(newSize);
			setIsEditing(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleInputBlur = () => {
		updateFontSize(inputValue);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			updateFontSize(inputValue);
			editor?.commands.focus();
		}
	};

	const increment = () => {
		const newSize = parseInt(fontSize) + 1;
		updateFontSize(newSize.toString());
	};

	const decrement = () => {
		const newSize = parseInt(fontSize) - 1;
		if (newSize > 0) {
			updateFontSize(newSize.toString());
		}
	};

	return (
		<div className='flex items-center gap-x-0.5'>
			<button
				className='h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 '
				onClick={decrement}
			>
				<MinusIcon className='size-4' />
			</button>

			{isEditing ? (
				<input
					type='text'
					value={inputValue}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
					onKeyDown={handleKeyDown}
					className='h-7 w-10 text-sm border border-neutral-400 text-center rounded-sm bg-transparent focus:outline-none focus:ring-0 '
				/>
			) : (
				<button
					className='h-7 w-10 text-sm border border-neutral-400 text-center rounded-sm bg-transparent cursor-text'
					onClick={() => {
						setIsEditing(true);
						setFontSize(currentFontSize);
					}}
				>
					{currentFontSize}
				</button>
			)}
			<button
				className='h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 '
				onClick={increment}
			>
				<PlusIcon className='size-4' />
			</button>
		</div>
	);
};

const ListButton = () => {
	const {editor} = useEditorStore();

	const lists = [
		{
			label: 'Bullet list',
			icon: ListIcon,
			isActive: () => editor?.isActive('bulletList'),
			onClick: () => editor?.chain().focus().toggleBulletList().run(),
		},
		{
			label: 'Ordered list',
			icon: ListOrderedIcon,
			isActive: () => editor?.isActive('orderedList'),
			onClick: () => editor?.chain().focus().toggleOrderedList().run(),
		},
	];

	return (
		<TooltipProvider>
			<DropdownMenu>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
								<ListIcon />
							</button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<span className='text-xs'>List</span>
					</TooltipContent>
				</Tooltip>

				<DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
					{lists.map(({label, icon: Icon, onClick, isActive}) => (
						<button
							key={label}
							onClick={onClick}
							className={cn(
								'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
								isActive() && 'bg-neutral-200/80'
							)}
						>
							<Icon className='size-4' />
							<span className='text-sm'>{label}</span>
						</button>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</TooltipProvider>
	);
};

const AlignButton = () => {
	const {editor} = useEditorStore();

	const alignments = [
		{
			label: 'Align left',
			value: 'left',
			icon: AlignLeftIcon,
		},
		{
			label: 'Align center',
			value: 'center',
			icon: AlignCenterIcon,
		},
		{
			label: 'Align right',
			value: 'right',
			icon: AlignRightIcon,
		},
		{
			label: 'Align justify',
			value: 'justify',
			icon: AlignJustifyIcon,
		},
	];
	return (
		<TooltipProvider>
			<DropdownMenu>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
								<AlignLeftIcon />
							</button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<span className='text-xs'>Text Align</span>
					</TooltipContent>
				</Tooltip>

				<DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
					{alignments.map(({label, value, icon: Icon}) => (
						<button
							key={value}
							onClick={() => editor?.chain().focus().setTextAlign(value).run()}
							className={cn(
								'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
								editor?.isActive({textAlign: value}) && 'bg-neutral-200/80'
							)}
						>
							<Icon className='size-4' />
							<span className='text-sm'>{label}</span>
						</button>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</TooltipProvider>
	);
};

const ImageButton = () => {
	const {editor} = useEditorStore();

	const [imageUrl, setImageUrl] = useState('');
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const onChange = (src: string) => {
		editor?.chain().focus().setImage({src}).run();
	};

	const onUpload = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';

		input.onchange = (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (file) {
				const imageUrl = URL.createObjectURL(file);
				onChange(imageUrl);
			}
		};

		input.click();
	};

	const handleImageUrlSubmit = () => {
		if (imageUrl) {
			onChange(imageUrl);
			setImageUrl('');
			setIsDialogOpen(false);
		}
	};

	return (
		<>
			<TooltipProvider>
				<DropdownMenu>
					<Tooltip delayDuration={100}>
						<TooltipTrigger asChild>
							<DropdownMenuTrigger asChild>
								<button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
									<ImageIcon />
								</button>
							</DropdownMenuTrigger>
						</TooltipTrigger>
						<TooltipContent>
							<span className='text-xs'>Image</span>
						</TooltipContent>
					</Tooltip>
					<DropdownMenuContent>
						<DropdownMenuItem onClick={onUpload}>
							<UploadIcon className='size-4 mr-2 ' />
							Upload
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
							<SearchIcon className='size-4 mr-2 ' />
							Paste image url
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TooltipProvider>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Insert image url</DialogTitle>
					</DialogHeader>
					<Input
						placeholder='Insert image url'
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleImageUrlSubmit();
							}
						}}
					/>
					<DialogFooter>
						<Button onClick={handleImageUrlSubmit}>Insert</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

const LinkButton = () => {
	const {editor} = useEditorStore();

	const [value, setValue] = useState('');

	const onChange = (href: string) => {
		editor?.chain().focus().extendMarkRange('link').setLink({href}).run();
		setValue('');
	};

	return (
		<TooltipProvider>
			<DropdownMenu
				onOpenChange={(open) => {
					if (open) {
						setValue(editor?.getAttributes('link').href || '');
					}
				}}
			>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
								<Link2Icon />
							</button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<span className='text-xs'>Link</span>
					</TooltipContent>
				</Tooltip>

				<DropdownMenuContent className='p-2.5 flex items-center gap-x-2'>
					<Input placeholder='https://example.com' value={value} onChange={(e) => setValue(e.target.value)} />
					<Button onClick={() => onChange(value)}>Apply</Button>
				</DropdownMenuContent>
			</DropdownMenu>
		</TooltipProvider>
	);
};

const HighlightColorButton = () => {
	const {editor} = useEditorStore();

	const value = editor?.getAttributes('highlight').color || '#ffffff';

	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setHighlight({color: color.hex}).run();
	};

	return (
		<TooltipProvider>
			<DropdownMenu>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
								<HighlighterIcon />
							</button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<span className='text-xs'>Highlight</span>
					</TooltipContent>
				</Tooltip>

				<DropdownMenuContent className='p-0'>
					<SketchPicker color={value} onChange={onChange} />
				</DropdownMenuContent>
			</DropdownMenu>
		</TooltipProvider>
	);
};

const TextColorButton = () => {
	const {editor} = useEditorStore();

	const value = editor?.getAttributes('textStyle').color || '#000000';

	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setColor(color.hex).run();
	};

	return (
		<TooltipProvider>
			<DropdownMenu>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
								<span>A</span>
								<div className='h-0.5 w-full ' style={{backgroundColor: value}} />
							</button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<span className='text-xs'>Text Color</span>
					</TooltipContent>
				</Tooltip>

				<DropdownMenuContent className='p-0'>
					<SketchPicker color={value} onChange={onChange} />
				</DropdownMenuContent>
			</DropdownMenu>
		</TooltipProvider>
	);
};

const HeadingLevelButton = () => {
	const {editor} = useEditorStore();

	const headings = [
		{
			label: 'Normal Text',
			value: 0,
			fontSize: '16px',
		},
		{
			label: 'Heading 1',
			value: 1,
			fontSize: '32px',
		},
		{
			label: 'Heading 2',
			value: 2,
			fontSize: '24px',
		},
		{
			label: 'Heading 3',
			value: 3,
			fontSize: '20px',
		},
		{
			label: 'Heading 4',
			value: 4,
			fontSize: '18px',
		},
		{
			label: 'Heading 5',
			value: 5,
			fontSize: '16px',
		},
	];

	const getCurrentHeading = () => {
		for (let level = 1; level <= 5; level++) {
			if (editor?.isActive('heading', {level})) {
				return `Heading ${level}`;
			}
		}
		return 'Normal Text';
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className='h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
					<span className='truncate'>{getCurrentHeading()}</span>
					<ChevronDownIcon className='ml-2  shrink-0' />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
				{headings.map(({label, value, fontSize}) => (
					<button
						key={value}
						style={{fontSize}}
						className={cn(
							'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
							(value === 0 && !editor?.isActive('heading')) ||
								(editor?.isActive('heading', {level: value}) && 'bg-neutral-200/80')
						)}
						onClick={() => {
							if (value === 0) {
								editor?.chain().focus().setParagraph().run();
							} else {
								editor
									?.chain()
									.focus()
									.toggleHeading({level: value as Level})
									.run();
							}
						}}
					>
						{label}
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const FontFamilyButton = () => {
	const {editor} = useEditorStore();

	const fonts = [
		{label: 'Arial', value: 'Arial'},
		{label: 'Time New Roman', value: 'Time New Roman'},
		{label: 'Courier New', value: 'Courier New'},
		{label: 'Georgia', value: 'Georgia'},
		{label: 'Verdana', value: 'Verdana'},
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className='h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
					<span className='truncate'>{editor?.getAttributes('textStyle').fontFamily || 'Arial'}</span>
					<ChevronDownIcon className='ml-2  shrink-0' />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
				{fonts.map(({label, value}) => (
					<button
						key={value}
						onClick={() => editor?.chain().focus().setFontFamily(value).run()}
						className={cn(
							'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
							editor?.getAttributes('textStyle').fontFamily === value && 'bg-neutral-200/80'
						)}
						style={{fontFamily: value}}
					>
						<span className='text-sm'>{label}</span>
					</button>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

interface ToolbarButtonProps {
	onClick?: () => void;
	isActive?: boolean;
	icon: LucideIcon;
	label: string;
}

const ToolbarButton = ({onClick, isActive, icon: Icon, label}: ToolbarButtonProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<button
						onClick={onClick}
						className={cn(
							'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
							isActive && 'bg-neutral-200/80'
						)}
					>
						<Icon />
					</button>
				</TooltipTrigger>
				<TooltipContent>
					<span className='text-xs'>{label}</span>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export const Toolbar = () => {
	const {editor} = useEditorStore();

	const sections: {
		label: string;
		icon: LucideIcon;
		onClick: () => void;
		isActive?: boolean;
	}[][] = [
		[
			{
				label: 'Undo',
				icon: Undo2Icon,
				onClick: () => editor?.chain().undo().run(),
			},
			{
				label: 'Redo',
				icon: Redo2Icon,
				onClick: () => editor?.chain().focus().redo().run(),
			},
			{
				label: 'Print',
				icon: PrinterIcon,
				onClick: () => window.print(),
			},
			{
				label: 'Spell Check',
				icon: SpellCheckIcon,
				onClick: () => {
					const current = editor?.view.dom.getAttribute('spellcheck');
					editor?.view.dom.setAttribute('spellcheck', current === 'false' ? 'true' : 'false');
				},
			},
		],
		[
			{
				label: 'Bold',
				icon: BoldIcon,
				isActive: editor?.isActive('bold'),
				onClick: () => editor?.chain().focus().toggleBold().run(),
			},
			{
				label: 'Italic',
				icon: ItalicIcon,
				isActive: editor?.isActive('italic'),
				onClick: () => editor?.chain().focus().toggleItalic().run(),
			},
			{
				label: 'Underline',
				icon: UnderlineIcon,
				isActive: editor?.isActive('underline'),
				onClick: () => editor?.chain().focus().toggleUnderline().run(),
			},
		],
		[
			{
				label: 'Comments',
				icon: MessageSquarePlus,
				isActive: false, // TODO: Enable this functionality
				onClick: () => console.log('TODO: Comment'),
			},
			{
				label: 'List Todo',
				icon: ListTodoIcon,
				isActive: editor?.isActive('taskList'),
				onClick: () => editor?.chain().focus().toggleTaskList().run(),
			},
			{
				label: 'Remove Formatting',
				icon: RemoveFormattingIcon,
				onClick: () => editor?.chain().focus().unsetAllMarks().run(),
			},
		],
	];

	return (
		<div className='bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[24px] flex items-center gap-x-2.5 overflow-x-auto'>
			{sections[0].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}

			<Separator orientation='vertical' className='h-6 bg-neutral-300' />
			<FontFamilyButton />
			<Separator orientation='vertical' className='h-6 bg-neutral-300' />
			<HeadingLevelButton />
			<Separator orientation='vertical' className='h-6 bg-neutral-300' />
			<FontSizeButton />
			<Separator orientation='vertical' className='h-6 bg-neutral-300' />

			{sections[1].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}

			<Separator orientation='vertical' className='h-6 bg-neutral-300' />

			<TextColorButton />
			<HighlightColorButton />

			<Separator orientation='vertical' className='h-6 bg-neutral-300' />

			<LinkButton />
			<ImageButton />
			<AlignButton />
			<LineHeightButton />
			<ListButton />

			{sections[2].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
		</div>
	);
};