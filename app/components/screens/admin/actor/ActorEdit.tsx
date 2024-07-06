import { FC } from 'react';
import dynamic from 'next/dynamic';
import { Controller, useForm } from 'react-hook-form';
import { IActorEditInput } from './actor-edit.interface';
import { useActorEdit } from './useActorEdit';
import Meta from '@/utils/meta/Meta';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Heading from '@/components/ui/heading/Heading';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import Field from '@/components/ui/form-elements/Field';
import SlugField from '@/components/ui/form-elements/SlugField/SlugField';
import Button from '@/components/ui/form-elements/Button';
import generateSlug from '@/utils/string/generateSlug';
import { stripHtml } from 'string-strip-html';
import fromStyles from '../../../ui/form-elements/admin-form.module.scss';
import UploadField from '@/components/ui/form-elements/UploadField/UploadField';

const DynamicTextEditor = dynamic(
	() => import('@/ui/form-elements/TextEditor'),
	{
		ssr: false,
	}
);

const ActorEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IActorEditInput>({
		mode: 'onChange',
	});

	const { isLoading, onSubmit } = useActorEdit(setValue);

	return (
		<Meta title="Edit actor">
			<AdminNavigation />
			<Heading title="Edit actor" />
			<form onSubmit={handleSubmit(onSubmit)} className={fromStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={fromStyles.fields}>
							<Field
								{...register('name', { required: 'Name is required!' })}
								placeholder="Name"
								error={errors.name}
								style={{ width: '31%' }}
							/>

							<SlugField
								register={register}
								error={errors.slug}
								generate={() => {
									setValue('slug', generateSlug(getValues('name')));
								}}
							/>
						</div>

						<Controller
							name="photo"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									onChange={onChange}
									value={value}
									error={error}
									folder="actors"
									placeholder="Photo"
								/>
							)}
							rules={{
								required: 'Photo is required!',
							}}
						/>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	);
};
export default ActorEdit;
