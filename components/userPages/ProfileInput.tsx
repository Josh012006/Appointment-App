


function ProfileInput({Type, ID, Placeholder, Label, ReadOnly, Value, OnChange} : {Type: string, ID: string, Placeholder: string, Label: string, ReadOnly: boolean, Value: string, OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
    return(
        <>
            <label htmlFor = {ID} className="my-3 font-bold">{Label}</label>
            {ReadOnly ? <input id={ID} name={ID} placeholder={Placeholder} required type={Type} className="pl-4 h-12 rounded-lg border-2 border-solid border-black" style={{backgroundColor: 'var(--side_color)'}} readOnly value = {Value} /> : <input id={ID} name={ID} placeholder={Placeholder} required type={Type} className="pl-4 h-12 rounded-lg border-2 border-solid border-black bg-white" value={Value} onChange={OnChange} />}
        </>
    );
}



export default ProfileInput;