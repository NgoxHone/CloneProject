/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Text, TextInput } from 'react-native';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.style = [Text.defaultProps.style, { color: '#191919' }];

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.style = [TextInput.defaultProps.style, { color: '#191919' }];
TextInput.defaultProps.placeholderTextColor = '#9E9E9E';
AppRegistry.registerComponent(appName, () => App);
