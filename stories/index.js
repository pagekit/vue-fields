import Fields from './components/Fields.vue';
import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';

storiesOf('Fields', module)

    .add('Default', () => ({

        components: {Fields},

        template: '<Fields :action="action"/>',

        methods: {action}

    }));
