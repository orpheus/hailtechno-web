import { useTranslation } from 'react-i18next'
import Button from 'Components/library/Button/Button'
import SelectInput from 'Components/library/InputSelect/SelectInput'
import TextInput from 'Components/library/InputText/TextInput'
import FileInput from 'Components/library/InputFile/FileInput'
import { useState } from 'react'
import clsx from 'clsx'

const Upload = ({
  c,
  uploadType,
  setUploadType,
  displayName,
  setDisplayName,
  artist,
  setArtist
}) => {
  const { t } = useTranslation()
  const [file, setFile] = useState()

  function handleFileUpload (e) {
    const files = e.target.files
    setFile(files[0])
    console.log('Uploaded file locally: ', file)
  }
  const disabled = (!artist || !displayName)
  return <div className={c.body}>
    <SelectInput
      id={'upload-type-input'}
      label={t('Upload Type')}
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
    <Button
      id={'file-submit-button'}
      className={clsx(
        c.spaceButton,
        disabled && c.disabled
      )}
    >
      {t('submit')}
    </Button>
  </div>
}

export default Upload
