import { useForm } from 'react-hook-form';
import { Label } from '../../shared/ui/Label/Label';
import { Input } from '../../shared/ui/Input/Input';
import styled from 'styled-components';
import { ButtonMain } from '../../shared/ui/Button/ButtonMain';
import { generateFields } from './utils/fields';
import { UserSchema } from './utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Error } from '../../shared/ui/Error/Error';
import { useCreateUserMutation } from '../../entities/users/service/user.service';
import { useEffect, useMemo } from 'react';
import type { UserProps } from '../../entities/users/service/users.types';
import { useNavigate } from 'react-router-dom';

export const GeneratorForm = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(UserSchema),
        mode: 'onBlur',
    });

    const fields = useMemo(() => generateFields(), []);

    const [createUser, { isSuccess, data, isLoading }] =
        useCreateUserMutation();

    useEffect(() => {
        if (isSuccess && data) {
            navigate(`/characters/${data?.user.uuid}`);
        }
    }, [isSuccess, data, navigate]);

    const onSubmit = async (data: UserProps) => {
        await createUser({ ...data });
    };

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
            {fields.map(field => (
                <Field key={field.name}>
                    <Label text={field.label} />
                    <Input {...field} {...register(field.name)} />
                    <Error error={errors[field.name]} />
                </Field>
            ))}
            <ButtonMain disabled={!isValid || isLoading}>
                {isLoading
                    ? 'Думаю, подожди'
                    : !isValid
                      ? 'Надо заполнить'
                      : 'Отправить'}
            </ButtonMain>
        </StyledForm>
    );
};

const Field = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${({ theme }) => `${theme.gaps.xs}px`};
`;

const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => `${theme.gaps.lg + 10}px`};
`;
