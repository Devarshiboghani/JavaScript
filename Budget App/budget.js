let transactions = [];

const ctx = document.getElementById('myChart').getContext('2d');

let chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['No Expense'],
        datasets: [{
            data: [1],
            backgroundColor: [
                '#ef4444',
                '#f97316',
                '#22c55e',
                '#3b82f6',
                '#a855f7'
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

function addTransaction() {
    const desc = document.getElementById('desc').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;

    if(desc.trim()==="" || isNaN(amount) || amount <= 0) return;

    transactions.push({desc,amount,type,category});
    updateUI();

    document.getElementById('desc').value="";
    document.getElementById('amount').value="";
}

function deleteTransaction(index){
    transactions.splice(index,1);
    updateUI();
}

function updateUI(){
    const list = document.getElementById('list');
    list.innerHTML="";

    let income=0;
    let expense=0;
    let categoryTotals = {};

    transactions.forEach((t,index)=>{
        const li = document.createElement('li');
        li.innerHTML = `
        <div>
            ${t.desc} 
            <small style="display:block; font-size:12px; opacity:0.7;">
                    ${t.category}
                </small>
        </div>
        
        <div>
            <span style="color:${t.type==="income" ? "#22c55e" : "#ef4444"}">
                ₹${t.amount.toFixed(2)}
            </span>
            <button class="delete-btn" onclick="deleteTransaction(${index})">❌</button>
         </div>
        `;
        list.appendChild(li);

        if(t.type==="income"){
            income+=t.amount;
        }else{
            expense+=t.amount;

            if(categoryTotals[t.category]){
                categoryTotals[t.category]+=t.amount;
            }else{
                categoryTotals[t.category]=t.amount;
            }
        }
    });

    document.getElementById('income').innerHTML="₹"+income.toFixed(2);
    document.getElementById('expense').innerHTML="₹"+expense.toFixed(2);
    document.getElementById('balance').innerHTML="₹"+(income-expense).toFixed(2);

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    if(data.length === 0){
        chart.data.labels = ['No Expense'];
        chart.data.datasets[0].data = [1];
        chart.data.datasets[0].backgroundColor = ['#94a3b8'];
    }else{
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.data.datasets[0].backgroundColor = [
            '#ef4444',
            '#f97316',
            '#22c55e',
            '#3b82f6',
            '#a855f7'
        ];
    }
    
    chart.update();
}