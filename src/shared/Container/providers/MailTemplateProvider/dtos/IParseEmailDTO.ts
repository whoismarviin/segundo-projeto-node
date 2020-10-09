interface ITemplateVariables{
    [key:string]:string | number;
}


export default interface IParseEmailDTO{
    template:string;
    variables:ITemplateVariables;

}