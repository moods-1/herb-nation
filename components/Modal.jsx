import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function Modal({ className, open, toggle, content }) {
	return (
		<Dialog open={open} onOpenChange={toggle}>
			<DialogContent className={`${className}`}>{content}</DialogContent>
		</Dialog>
	);
}
