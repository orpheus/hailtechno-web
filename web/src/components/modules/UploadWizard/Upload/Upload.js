import { useTranslation } from 'react-i18next'
import Button from 'Components/library/Button/Button'
import SelectInput from 'Components/library/InputSelect/SelectInput'
import TextInput from 'Components/library/InputText/TextInput'
import FileInput from 'Components/library/InputFile/FileInput'

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

  function handleFileInput (FileList) {
    console.log(FileList)
  }
  return <div className={c.body}>
    <SelectInput
      id={'upload-type-input'}
      label={t('Upload Type')}
      options={[t('track'), t('mix'), t('image'), t('video')]}
      onValueChange={setUploadType}
      placeholder={'Upload Type'}
      value={uploadType}
    />
    <TextInput
      id={'filename-input'}
      placeholder={t('filename')}
      label={t('filename')}
      value={displayName}
      onValueChange={setDisplayName}
    />
    <TextInput
      id={'artist-input'}
      placeholder={t('artist')}
      label={t('artist')}
      value={artist}
      onValueChange={setArtist}
    />
    <FileInput
      id={'file-upload-input'}
      label={'Upload File'}
      onFileSelect={handleFileInput}
    />
    <Button
      id={'file-submit-button'}
      className={c.doneButton}>
      {t('submit')}
    </Button>
  </div>
}

export default Upload
