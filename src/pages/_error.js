import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head'
import StatusLayout from 'layouts/StatusLayout';
import i18next from 'i18next';

/**
 * Displays an error page, given a status code and optional error message.
 */
export default class Error extends React.Component {
  
  static displayName = 'ErrorPage';

  static getInitialProps({ res, err }) {
    const statusCode =
      res && res.statusCode ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
  }

  render() {

    const statusCodes = {
      400: i18next.t("errors.badRequest"),
      401: i18next.t("errors.noAuth"),
      404: i18next.t("errors.notFound"),
      500: i18next.t("errors.internalError"),
      501: i18next.t("errors.notImplemented"),
    };
    const { statusCode, errorMessage } = this.props;
    const title = this.props.title || statusCodes[statusCode] || i18next.t("errors.unexpected");

    return (
      <StatusLayout>
        <Head>
          <title>{`${statusCode}: ${title}`}</title>
        </Head>
        <h2>{title}</h2>
        {errorMessage && <p>{errorMessage}</p>}
      </StatusLayout>
    );
  }
}

export class ErrorNoHeader extends React.Component {
    static displayName = 'ErrorNoHeader';

    render() {
        const { errorMessage } = this.props;
        return (errorMessage && <p>{errorMessage}</p>);
    }
}

if (process.env.NODE_ENV !== 'production') {
  Error.propTypes = {
    errorMessage: PropTypes.string,
  };
}
