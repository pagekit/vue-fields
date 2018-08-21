<template>

    <div class="container">

        <h1>Fields</h1>

        <div class="row">
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading"><h2 class="panel-title">Default</h2></div>
                    <FieldsCustom :config="fields" :values="values" class="panel-body" @change="change"/>
                </div>
            </div>
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading"><h2 class="panel-title">Custom</h2></div>
                    <FieldsCustom :config="fields" :values="values" class="panel-body" @change="change"/>
                </div>
            </div>
        </div>

        <pre>{{ values }}</pre>

    </div>

</template>

<script>

    import FieldsCustom from './FieldsCustom.vue';
    import {action} from '@storybook/addon-actions';

    export default {

        components: {
            FieldsCustom
        },

        data: () => ({

            fields: {

                text: {
                    label: 'Text'
                },

                textarea: {
                    label: 'Textarea',
                    type: 'textarea'
                },

                select: {
                    label: 'Select',
                    type: 'select',
                    default: 1,
                    options: {
                        one: 1,
                        two: 2,
                        three: 3
                    }
                },

                number: {
                    label: 'Number',
                    type: 'number'
                },

                // custom: {
                //     label: 'Custom',
                //     type: 'custom'
                // },

                show: {
                    type: 'checkbox',
                    default: true
                },

                _show: {
                    label: 'Show/Hide',
                    type: 'text',
                    show: 'show == true'
                },

                enable: {
                    type: 'checkbox',
                    default: true
                },

                _enable: {
                    label: 'Enable/Disable',
                    type: 'text',
                    enable: ({enable}) => enable
                },

                'nested.text': {
                    label: 'Nested Text',
                    type: 'text'
                }

            },

            values: {}

        }),

        methods: {

            change(value, {name}) {
                action(`@change (${name})`)(value);
            }

        }

    };

</script>

<style>

@import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css');

</style>
