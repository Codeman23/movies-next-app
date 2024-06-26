import { FC } from 'react';
import Button from '@/components/ui/form-elements/Button';

const AdminCreateButton: FC<{ onCLick: () => void }> = ({ onCLick }) => {
	return <Button onClick={onCLick}>Create new</Button>;
};
export default AdminCreateButton;
