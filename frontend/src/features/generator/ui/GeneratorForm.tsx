import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useCreateUserMutation } from '../../../entities/user';
import { useSession } from '../../../shared/hooks/useSession';
import { userSchema, type UserFormData } from '../model/validation';
import { generateFields } from '../model/fields';
import { Input } from '../../../shared/ui/Input/Input';
import { Label } from '../../../shared/ui/Label/Label';
import { Button } from '../../../shared/ui/Button/Button';
import { CooldownTimer } from '../../../shared/ui/CooldownTimer/CooldownTimer';

export const GeneratorForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { session, refresh } = useSession();
    const fields = useMemo(() => generateFields(), []);

    const ageParam = searchParams.get('age');
    const prefilled = {
        name: searchParams.get('name') ?? '',
        surname: searchParams.get('surname') ?? '',
        age: ageParam ? Number(ageParam) : (undefined as unknown as number),
        profession: searchParams.get('profession') ?? '',
    };
    const hasPrefill = !!searchParams.get('name');

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        mode: hasPrefill ? 'onChange' : 'onBlur',
        defaultValues: hasPrefill ? prefilled : undefined,
    });

    const [createUser, { isLoading, error }] = useCreateUserMutation();

    const onSubmit = async (data: UserFormData) => {
        try {
            const result = await createUser(data).unwrap();
            refresh();
            navigate(`/characters/${result.user.uuid}`);
        } catch (e: unknown) {
            const err = e as { status?: number };
            if (err.status === 429) {
                refresh();
            }
        }
    };

    if (!session.canGenerate && session.cooldownUntil) {
        return (
            <CooldownWrapper>
                <CooldownTitle>Лимит генераций исчерпан</CooldownTitle>
                <CooldownSubtitle>
                    Ты использовал все {session.limit} генерации. Возвращайся позже.
                </CooldownSubtitle>
                <CooldownTimer cooldownUntil={session.cooldownUntil} onExpire={refresh} />
            </CooldownWrapper>
        );
    }

    return (
        <FormWrapper>
            {hasPrefill && (
                <PrefillBanner>
                    <svg viewBox='0 0 24 24' width='14' height='14' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                        <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
                        <circle cx='9' cy='7' r='4' />
                        <line x1='19' y1='8' x2='19' y2='14' />
                        <line x1='22' y1='11' x2='16' y2='11' />
                    </svg>
                    Данные похожего персонажа подставлены — измени что хочешь и генерируй
                </PrefillBanner>
            )}
            <Header>
                <FormTitle>Генератор</FormTitle>
                <LimitBadge>
                    <LimitDots>
                        {Array.from({ length: session.limit }).map((_, i) => (
                            <Dot key={i} $used={i >= session.remaining} />
                        ))}
                    </LimitDots>
                    <LimitText>
                        {session.remaining} из {session.limit}
                    </LimitText>
                </LimitBadge>
            </Header>

            <Form onSubmit={handleSubmit(onSubmit)}>
                {fields.map(field => (
                    <FieldGroup key={field.name}>
                        <Label text={field.label} htmlFor={field.name} />
                        <Input
                            id={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            $hasError={!!errors[field.name]}
                            {...register(field.name)}
                        />
                        {errors[field.name] && (
                            <ErrorText>{errors[field.name]?.message}</ErrorText>
                        )}
                    </FieldGroup>
                ))}

                {error && (
                    <ApiError>Ошибка сервера. Попробуй ещё раз.</ApiError>
                )}

                <Button
                    type='submit'
                    $fullWidth
                    disabled={!isValid || isLoading || !session.canGenerate}
                >
                    {isLoading ? (
                        <>
                            <Spinner />
                            Генерирую...
                        </>
                    ) : (
                        'Создать персонажа'
                    )}
                </Button>
            </Form>
        </FormWrapper>
    );
};

const FormWrapper = styled.div`
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.gaps.lg}px;
`;

const FormTitle = styled.h1`
    font-size: ${({ theme }) => theme.font.size.xl};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const LimitBadge = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
`;

const LimitDots = styled.div`
    display: flex;
    gap: 4px;
`;

const Dot = styled.div<{ $used: boolean }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme, $used }) =>
        $used ? 'rgba(255,255,255,0.1)' : theme.colors.gradient};
    transition: ${({ theme }) => theme.transition};
    ${({ $used }) => !$used && 'box-shadow: 0 0 6px rgba(99, 102, 241, 0.5);'}
`;

const LimitText = styled.span`
    font-size: ${({ theme }) => theme.font.size.xs};
    color: ${({ theme }) => theme.colors.textMuted};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gaps.lg}px;
`;

const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.gaps.xs}px;
`;

const ErrorText = styled.span`
    font-size: ${({ theme }) => theme.font.size.xs};
    color: ${({ theme }) => theme.colors.error};
`;

const ApiError = styled.div`
    padding: 12px 16px;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: ${({ theme }) => theme.radius.md};
    font-size: ${({ theme }) => theme.font.size.sm};
    color: ${({ theme }) => theme.colors.error};
`;

const CooldownWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.gaps.lg}px;
    padding: ${({ theme }) => theme.gaps.xxl}px;
    text-align: center;
    background: ${({ theme }) => theme.colors.bgSurface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.xl};
    max-width: 480px;
    margin: 0 auto;
`;

const CooldownTitle = styled.h2`
    font-size: ${({ theme }) => theme.font.size.xl};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    color: ${({ theme }) => theme.colors.textPrimary};
`;

const CooldownSubtitle = styled.p`
    font-size: ${({ theme }) => theme.font.size.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    max-width: 300px;
`;

const spin = keyframes`
    to { transform: rotate(360deg); }
`;

const PrefillBanner = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: ${({ theme }) => theme.gaps.md}px;
    padding: 10px 14px;
    background: rgba(99, 102, 241, 0.08);
    border: 1px solid rgba(99, 102, 241, 0.25);
    border-radius: ${({ theme }) => theme.radius.md};
    font-size: ${({ theme }) => theme.font.size.xs};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.4;
`;

const Spinner = styled.div`
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: ${spin} 0.7s linear infinite;
`;
