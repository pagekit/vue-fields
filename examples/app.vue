<template>

    <div class="container">

        <h1>Fields</h1>

        <div class="row">
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading"><h2 class="panel-title">Default</h2></div>
                    <fields-custom class="panel-body" :config="fields" :values="values" @change="change"/>
                </div>
            </div>
            <div class="col-md-6">
                <div class="panel panel-default">
                    <div class="panel-heading"><h2 class="panel-title">Custom</h2></div>
                    <fields-custom class="panel-body" :config="fields" :values="values" @change="change"/>
                </div>
            </div>
        </div>

        <pre>{{ values | json }}</pre>
        <pre>{{ changed }}</pre>

    </div>

</template>

<script>

    import fieldsCustom from './fields-custom.vue';

    export default {

        components: {
            fieldsCustom
        },

        filters: {

            json(val) {
                return JSON.stringify(val, null, 2);
            }

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
                    enable: values => values.enable
                },

                'nested.text': {
                    label: 'Nested Text',
                    type: 'text'
                }

            },

            values: {},

            changed: ''

        }),

        methods: {

            change(field, value, prev) {
                this.changed = '@change >> ' + field.name + ': ' + JSON.stringify(value) + ' (' + JSON.stringify(prev) + ')';
            }

        }

    };

</script>
