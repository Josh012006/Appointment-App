


function Input({Type, ID, Placeholder, Label} : {Type: string, ID: string, Placeholder: string, Label: string}) {
    return(
        <>
            <label htmlFor = {ID} className="my-3">{Label}</label>
            <input id={ID} placeholder={Placeholder} required type={Type} className="pl-4 h-12 rounded-lg border-2 border-solid border-black" />
        </>
    );
}



export default Input;
