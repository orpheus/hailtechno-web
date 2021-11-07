import { useTranslation } from 'react-i18next'
import TextInput from 'Components/library/InputText/TextInput'
import Button from 'Components/library/Button/Button'

const Validation = ({
  c,
  email,
  setEmail,
  accessCode,
  setAccessCode,
  handleValidation
}) => {
  const { t } = useTranslation()
  return <div className={c.body}>
    <TextInput
      placeholder={'email'}
      label={t('email')}
      value={email}
      onValueChange={setEmail}
    />
    <TextInput
      placeholder={'access-code'}
      label={t('access-code')}
      value={accessCode}
      onValueChange={setAccessCode}
    />
    <Button className={c.doneButton}>
      {t('validate')}
    </Button>
  </div>
}

export default Validation
