import * as React from 'react';
import { useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';

import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Container,
  TextField,
  MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    submitButton: {
      minHeight: theme.spacing(8),
    },
  })
);

export default function Home() {
  const classes = useStyles();
  const intl = useIntl();

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  return (
    <>
      <section>
        <Container maxWidth="sm">
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* First Name */}
            <TextField
              inputRef={register({
                required: {
                  value: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Your first name is required',
                  }),
                },
              })}
              name="First Name"
              label={intl.formatMessage({
                defaultMessage: 'First Name',
                description: 'First name label',
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'Your first name',
                description: 'First name placeholder',
              })}
              error={!!errors['First Name']}
              helperText={errors['First Name']?.message}
            />

            {/* Last Name */}
            <TextField
              inputRef={register({
                required: {
                  value: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Your last name is required',
                  }),
                },
              })}
              name="Last Name"
              label={intl.formatMessage({
                defaultMessage: 'Last Name',
                description: 'Last name label',
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'Your last name',
                description: 'Last name placeholder',
              })}
              error={!!errors['Last Name']}
              helperText={errors['Last Name']?.message}
            />

            {/*FIXME CountrySelect not working properly, inputRef not working */}

            {/* TODO  https://restcountries.eu/#api-endpoints-response-example */}

            {/* TODO  https://material-ui.com/components/autocomplete/#asynchronous-requests */}

            {/* Country */}
            <TextField
              inputRef={register({
                required: {
                  value: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Your country is required',
                  }),
                },
              })}
              select
              name="Country"
              label={intl.formatMessage({
                defaultMessage: 'Country',
                description: 'Country label',
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'Your country',
                description: 'Country placeholder',
              })}
              error={!!errors['Country']}
              helperText={errors['Country']?.message}
            >
              {/* {COUNTRY_DATA.countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))} */}
              <MenuItem value="FR">France</MenuItem>
              <MenuItem value="US">United State</MenuItem>
              <MenuItem value="MA">Morocco</MenuItem>
            </TextField>

            {/* Email Address */}
            <TextField
              inputRef={register({
                required: {
                  value: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Your email address is required',
                  }),
                },
                pattern: {
                  value: /^\S+@\S+$/,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              name="Email Address"
              label={intl.formatMessage({
                defaultMessage: 'Email Address',
                description: 'Email address label',
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'Your email address',
                description: 'Email address placeholder',
              })}
              error={!!errors['Email Address']}
              helperText={errors['Email Address']?.message}
            />

            {/* Phone Number */}
            <TextField
              inputRef={register({
                required: {
                  value: true,
                  message: intl.formatMessage({
                    defaultMessage: 'Your phone number is required',
                  }),
                },
              })}
              type="tel"
              name="Phone Number"
              label={intl.formatMessage({
                defaultMessage: 'Phone Number',
                description: 'Phone number label',
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'Your phone number',
                description: 'Phone number placeholder',
              })}
              error={!!errors['Phone Number']}
              helperText={errors['Phone Number']?.message}
            />

            <Button
              className={classes.submitButton}
              variant="contained"
              color="secondary"
              size="large"
            >
              {intl.formatMessage({
                defaultMessage: 'Submit',
                description: 'Submit button content',
              })}
            </Button>
          </form>
        </Container>
      </section>
    </>
  );
}

// const WithLayout = () => {
//   const intl = useIntl();

//   return (
//     <Layout
//       title={intl.formatMessage({
//         defaultMessage: 'Home',
//       })}
//     >
//       <Head>
//         <meta
//           name="description"
//           content={intl.formatMessage({
//             defaultMessage:
//               'An example app integrating React Intl with Next.js',
//           })}
//         />
//       </Head>
//       <p>
//         <FormattedMessage defaultMessage="Hello, World!" />
//       </p>
//       <p>
//         <FormattedNumber value={1000} />
//       </p>
//     </Layout>
//   );
// };
