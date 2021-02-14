import * as React from 'react';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';
import Head from 'next/head';
import Layout from '../src/components/Layout';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { Button } from '@material-ui/core';

export default function Home() {
  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js v5-alpha with TypeScript example
          </Typography>
        </Box>
      </Container>
      <Container>
        <WithLayout />
        <Button variant="contained">Primary</Button>
      </Container>
    </>
  );
}

const WithLayout = () => {
  const intl = useIntl();

  return (
    <Layout
      title={intl.formatMessage({
        defaultMessage: 'Home',
      })}
    >
      <Head>
        <meta
          name="description"
          content={intl.formatMessage({
            defaultMessage:
              'An example app integrating React Intl with Next.js',
          })}
        />
      </Head>
      <p>
        <FormattedMessage defaultMessage="Hello, World!" />
      </p>
      <p>
        <FormattedNumber value={1000} />
      </p>
    </Layout>
  );
};
