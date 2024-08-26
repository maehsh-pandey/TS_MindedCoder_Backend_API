export default {
    SUCCESS: 'The operation has been successfull.',
    SOMETHING_WENT_WRONG: 'Something went wrong.',
    NOT_FOUND: (unity: string): string => {
        return `${unity} not found`
    }
}
