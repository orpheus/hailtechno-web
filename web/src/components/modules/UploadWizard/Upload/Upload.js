import { useTranslation } from 'react-i18next'
import Button from 'Components/library/Button/Button'
import SelectInput from 'Components/library/InputSelect/SelectInput'
import TextInput from 'Components/library/InputText/TextInput'
import FileInput from 'Components/library/InputFile/FileInput'
import clsx from 'clsx'
import PulseLoader from 'Components/library/Loaders/PulseLoader/PulseLoader'

const Upload = ({
  c,
  uploadType,
  setUploadType,
  displayName,
  setDisplayName,
  artist,
  setArtist,
  file,
  setFile,
  handleUploadSubmit,
  uploadFn
}) => {
  const { t } = useTranslation()

  function handleFileUpload (e) {
    const file = e.target.files[0]
    setFile(file)
  }
  const disabled = (!artist || !displayName || !file)
  return <div className={c.body}>
    <SelectInput
      id={'upload-type-input'}
      label={t('upload_type')}
      options={[t('track'), t('mix'), t('image'), t('video')]}
      onValueChange={setUploadType}
      placeholder={t('upload_type')}
      value={uploadType}
      className={c.input}
      labelProps={{ className: c.label }}
    />
    <TextInput
      id={'filename-input'}
      placeholder={t('filename')}
      label={t('filename')}
      value={displayName}
      onValueChange={setDisplayName}
      className={c.input}
      labelProps={{ className: c.label }}
    />
    <TextInput
      id={'artist-input'}
      placeholder={t('artist')}
      label={t('artist')}
      value={artist}
      onValueChange={setArtist}
      className={c.input}
      labelProps={{ className: c.label }}
    />
    {file ? <span className={c.filename}>{file?.name}</span>
      : <FileInput
        id={'file-upload-input'}
        label={'Upload File'}
        className={c.uploadFileButton}
        onChange={handleFileUpload}
      />}
    {uploadFn.isLoading ? <PulseLoader />
      : <Button
        id={'file-submit-button'}
        className={clsx(
          c.spaceButton,
          disabled && c.disabled
        )}
        onClick={handleUploadSubmit}
      >
        {t('submit')}
      </Button>}
    {uploadFn.isSuccess && <div className={c.successText}>
      {t('uploaded')}
    </div>}
    {uploadFn.isError && <div className={c.errorText}>
      {uploadFn.error.message}
    </div>}
  </div>
}

export default Upload
