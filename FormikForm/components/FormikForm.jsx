// Formik x React Native example
import React from 'react';
import { Button, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { Formik } from 'formik';

export const FormikForm = props => (
    <ScrollView keyboardShouldPersistTaps="false">
        <SafeAreaView>

            <Formik
                initialValues={{ email: '' }}
                onSubmit={values => console.log(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (

                    <View>
                        <Text>Enter your email:</Text>
                        <TextInput
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {/* <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    /> */}
                        <Button onPress={handleSubmit} title="Submit" />
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    </ScrollView>
);