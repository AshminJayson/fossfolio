import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { Child } from '@app/types';
import { store } from '@app/store';
import { gqClient } from '@app/config';

type ComponentWithPageLayout = AppProps & {
    Component: AppProps['Component'] & {
        Layout?: (arg: Child) => JSX.Element;
    };
};

const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => (
    <ApolloProvider client={gqClient}>
        <Provider store={store}>
            <DefaultSeo
                title="FossFolio"
                description="Discover,host and manage Events,Hackathons all in one place. "
            />
            <ChakraProvider>
                {Component.Layout ? (
                    <Component.Layout>
                        <Component {...pageProps} />
                    </Component.Layout>
                ) : (
                    <Component {...pageProps} />
                )}
            </ChakraProvider>
        </Provider>
    </ApolloProvider>
);
export default MyApp;
