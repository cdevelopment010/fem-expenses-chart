let graphArea = document.querySelector('.graph'); 


async function getData() {
    let data =  await fetch('./data.json')
                        .then((response) => response.json());

    console.log(data);

    let maxAmount = Math.max(...data.map((bar) => bar.amount));
    // let maxAmount = data.reduce((prev, curr) => {
    //     if (curr.amount > prev) {
    //         return curr.amount; 
    //     } else {
    //         return prev
    //     }
    // }, 0)
    
    data.forEach(bar => {
        let barContainer = document.createElement('div'); 
        let barEl = document.createElement('div');
        let barTooltipEl = document.createElement('div');
        let labelEl = document.createElement('div');
        let today = new Date().toString().substring(0,3).toLowerCase(); 
        
        barContainer.className = "bar-container"; 

        barEl.className = `bar ${bar.day == today ? 'today' : ''}`
        barEl.style.maxHeight = (bar.amount / maxAmount * 100) + '%';
        
        barTooltipEl.innerText = "$" + bar.amount; 
        barTooltipEl.className = "bar-tooltip"; 

        labelEl.innerText = bar.day;
        labelEl.className = "label"; 
        
        barEl.appendChild(barTooltipEl); 

        barContainer.appendChild(barEl);
        barContainer.appendChild(labelEl);
        graphArea.appendChild(barContainer);
    })

    let gridCols = []; 
    data.forEach(d => gridCols.push("1fr"));
    graphArea.style.gridTemplateColumns = gridCols.join(" ");

    /*
        - container to put in bars
        - create a element per bar
        - within the bar I need a bar and a label
        - a class for "today's" bar

    */


}

getData(); 

