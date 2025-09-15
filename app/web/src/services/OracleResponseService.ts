
const ITEMS_KEY = 'items';
const RESULT_SET_KEY = 'resultSet';
const METADATA_KEY = 'metadata';
const ERROR_CODE_KEY = 'errorCode';
const ERROR_MESSAGE_KEY = 'errorMessage';
const ERROR_DETAILS_KEY = 'errorDetails';

export function wasQuerySuccessful(data: any): boolean {
    const {item, error} = getResponseItem(data);
    if(error){
        console.log(error);
        return false;
    }

    return !(ERROR_CODE_KEY in item);
}

export function getResultMetadata(data){
    const {item, error} = getResponseItem(data);
    if(error)
        return null;

    if(!wasQuerySuccessful(data))
        return null;

    if(!Object.prototype.hasOwnProperty.call(item, RESULT_SET_KEY))
        return null;

    return item[RESULT_SET_KEY][METADATA_KEY]?? [];
}

export function getResultRows(data){
    const {item, error} = getResponseItem(data);
    if(error)
    {
        console.log(error);
        return null;
    }

    if(!wasQuerySuccessful(data))
    {
        console.log("Query failed");
        return null;
    }


    if(!Object.prototype.hasOwnProperty.call(item, RESULT_SET_KEY))
    {
        console.log("No result set found");
        return null;
    }

    return item[RESULT_SET_KEY][ITEMS_KEY]?? [];
}

export function getErrorMessage(data: any): string | null {
    const {item, error} = getResponseItem(data);
    if(error)
    {
        console.log(error);
        return null;
    }

    if(wasQuerySuccessful(data))
    {
        console.log("Query was successful");
        return null;
    }

    return item[ERROR_MESSAGE_KEY] ?? null;
}

export function getErrorDetails(data: any): string | null {
    const {item, error} = getResponseItem(data);
    if(error)
    {
        console.log(error);
        return null;
    }

    if(wasQuerySuccessful(data)) {
        console.log("Query was successful");
        return null;
    }

    return item[ERROR_DETAILS_KEY] ?? null;
}

export function getResponseItem(data: any) {
     const result = (typeof data === 'string') ? JSON.parse(data) : data;

     console.log(result);

    if(!Object.prototype.hasOwnProperty.call(result.raw, ITEMS_KEY))
        return {item: null, error: 'Response does not contain items key'};

    if(result.raw.items.length === 0)
        return {item: null, error: 'No items found in response'};

    return {item: result.raw.items[0], error: null}
}