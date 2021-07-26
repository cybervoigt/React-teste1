import React from 'react';


function TableRow(props){
    return (
    <tr key={props.myKey}>
        <td>{props.myKey}</td>
        <td>{props.value}</td>        
        <td align="right">{props.leftover}</td>
    </tr>
    )
}

export default function TesteTabelaPrice(){

    // here is the "magic"...  :-)
    // the React returns the array (list of payments)
    // and the "set method" to define a new list.
    const tmplist = [];
    const [list1,setList1] = React.useState(tmplist);

    return (
    <>
    <h2>Price amortization table simulator...</h2>

    <form onSubmit={function handleSubmitForm(e){
      e.preventDefault();

      const dadosForm = new FormData(e.target);

      const principal = dadosForm.get('principal');
      const term = dadosForm.get('term');
      const rate = dadosForm.get('rate');

      try {

        if(principal == ""){
            throw new Error('type the principal value...');
          }
          if(term == ""){
            throw new Error('type the term in months...');
          }
          if(rate == ""){
            throw new Error('type the rate(%) by month...');
          }

          // convert...
          const vPrincipal = parseFloat(principal);
          const nTerm = parseInt(term);
          const vRate = parseFloat(rate);

          // calculate the value of each month payment (drop)...
          var vPayMonth = vPrincipal * ( ( ((1+(vRate/100))**nTerm)*(vRate/100) ) / ( (((1+(vRate/100))**nTerm)-1) ) );
          // :-/
          vPayMonth = Math.round(vPayMonth * 100)/100;

//alert('vPayMonth = ' + vPayMonth.toString());

          var vLeftOver = vPayMonth * nTerm;

          const tmpList = [];
          for(var i = 1; i<=nTerm; i++)
          {
            vLeftOver = vLeftOver - vPayMonth;

            // :-/
            vLeftOver = Math.round(vLeftOver * 100)/100;

            // how to apply a mask to values? with 2 digits after decimal separator...

            const tmpObject = {
                id: i,
                vPay: vPayMonth,
                vLeftOver: vLeftOver,
              }
              tmpList.push(tmpObject);
          }
          setList1(tmpList);
      }
      catch(err) {
        alert('MY ERROR: '+ err.message);
      }


    } } >
      <input type="text" name="principal" aria-label="principal value" placeholder="principal value"/>
      <input type="text" name="term" aria-label="Term in months" placeholder="term in months"/>
      <input type="text" name="rate" aria-label="Rate (%)" placeholder="rate (%)"/>
      <button>get table...</button>
    </form>

    <h3>Payments...</h3>

    <table border="1">
    <tbody>
        <tr>
        <td>#</td><td>Value per month</td><td>Left Value</td>
        </tr>
        {list1.map((item) => {
        return  <TableRow key={item.id} myKey={item.id} value={item.vPay} leftover={item.vLeftOver}/>
         })}
    </tbody>
    </table>

    </>
    )
}