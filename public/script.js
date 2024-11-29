document.addEventListener('DOMContentLoaded', ()=>{
    const checklistTableBody = document.querySelector('#checklist-table tbody')


    //checklist rules 
    const checklistRules = [
        {
            label : 'Valuation Fee Paid',
            rule: (data) => data.isValuationFeePaid === true
        },
        {
            label: 'UK Resident',
            rule : (data) => data.isUkResident === true
        },
        {
            label: 'Risk Rating Medium',
            rule: (data) => data.riskRating === "Medium"
        },
        {
            label :'LTV Below 60%',
            rule : (data) =>
                data.mortgage.loanRequired / data.mortgage.purchasePrice < 0.6
        }
    ]


    //fetching application data from the server

    const fetchApplicationData = async ()=>{
        try{
            const response = await fetch('/api/application')
            const data = await response.json()

            //checklist rules process 

            const result = checklistRules.map((rule) =>({
                label: rule.label,
                passed:rule.rule(data)
            }))

            result.forEach(({label, passed}) =>{
                const row = document.createElement('tr');
                row.className = passed ? 'passed' : 'failed'

                const ruleCell = document.createElement('td')
                ruleCell.textContent = label

                const statusCell = document.createElement('td')
                statusCell.textContent = passed ? "Passed" : "Failed"


                row.appendChild(ruleCell)
                row.appendChild(statusCell)

                checklistTableBody.appendChild(row)
            })
        }catch (error){
            console.error('Error fetching application data:', error)
            checklistTableBody.innerHTML = `<tr><td colspan = "2">Failed to load data</td></tr>`

        }
    }

    fetchApplicationData()
})