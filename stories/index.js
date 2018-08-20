import FieldsStory from './components/FieldsStory.vue';
import {storiesOf} from '@storybook/vue';

storiesOf('Fields', module)
    .add('Default', () => ({extends: FieldsStory}));
