import { useState } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import TextInput from 'Components/library/InputText/TextInput'
import Button from 'Components/library/Button/Button'
import lazyEmailValidation from 'Helpers/validateEmail'

const Validation = ({
  c,
  email,
  setEmail,
  accessCode,
  setAccessCode,
  handleValidation,
  validationResponse,
  validationError,
  validateFn
}) => {
  const { t } = useTranslation()
  const [emailError, setEmailError] = useState(false)

  if (validationError) {
    return <h1 className={c.validationError}>{t('access_denied')}</h1>
  }

  const disabled = (emailError || !email || !accessCode)
  return <div className={c.body}>
    <TextInput
      placeholder={'email'}
      label={t('email')}
      type={'email'}
      value={email}
      onValueChange={setEmail}
      className={clsx(c.input, emailError && `${c.input}--error`)}
      labelProps={{ className: c.label }}
      error={lazyEmailValidation(email)}
      onBlur={() => setEmailError(lazyEmailValidation(email))}
    />
    <TextInput
      placeholder={'access-code'}
      label={t('access-code')}
      // type={'password'}
      value={accessCode}
      onValueChange={setAccessCode}
      className={c.input}
      labelProps={{ className: c.label }}
    />
    <Button
      className={clsx(
        c.spaceButton,
        disabled && c.disabled
      )}
      onClick={!disabled ? handleValidation : undefined}>
      {t('validate')}
    </Button>
    {validationError && t('access_denied')}
  </div>
}

export default Validation
