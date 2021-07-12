import useTranslation from 'next-translate/useTranslation';

function Custom404() {
  const { t } = useTranslation('error');
  const errorMessage = t('404');

  return <h1>{errorMessage}</h1>;
}

export default Custom404;
