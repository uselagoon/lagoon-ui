import React from 'react';
import StatusLayout, { StatusLayoutNoHeader } from 'layouts/StatusLayout';
import useTranslation from "lib/useTranslation";

/**
 * Displays the loading page.
 */
const LoadingPage = () => {
  const t = useTranslation();
  return (
    <StatusLayout>
      <h2>{t("general.loading")}</h2>
    </StatusLayout>
  );
};

export const LoadingPageNoHeader = () => {
  const t = useTranslation();
  return (
    <StatusLayoutNoHeader>
      <h2>{t("general.loading")}</h2>
    </StatusLayoutNoHeader>
  );
};

export default LoadingPage;
