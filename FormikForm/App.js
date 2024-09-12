import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { FormikForm } from './components/FormikForm';
import { Formik } from 'formik';

export default function App() {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
