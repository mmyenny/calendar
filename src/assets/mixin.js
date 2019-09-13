import moment from 'moment';

export default {
    methods: {
        formatDateMixin(value, args) {
            switch (args) {
                case 'milDateTime':
                    if (value) {
                        return moment(value).format('DD MMM YY HH:mm (Z)')
                    }
                    break
                case 'milDate':
                    if (value) {
                        return moment(value).format('DD MMM YY')
                    }
                    break
                case 'shortDate':
                    if (value) {
                        return moment(value).format('MMM Do, YYYY')
                    }
                    break
                case 'shortDateNumeric':
                    if (value) {
                        return moment(value).format('L')
                            //format 08/30/2019
                    }
                    break
                case 'shortDateTime':
                    if (value) {
                        return moment(value).format('DD MMM [at] HH:mm (Z)')
                    }
                    break
                case 'Time':
                    if (value) {
                        return moment(value).format('LT')
                    }
                    break
                case 'convertDate':
                    if (value) {
                        return (
                            moment(value).fromNow() +
                            ' at ' +
                            moment(value).format('MMM Do YYYY HH:mm (Z)')
                        )
                    }
                    break
                case 'dtg':
                    if (value) {
                        return moment(value)
                            .utc()
                            .format('DDHHmm[Z]MMMYY')
                    }
                    break
                case 'calDate':
                    if (value) {
                        return moment(value).format()
                    }
                    break
                default:
                    return value
            }
        }
    }
}