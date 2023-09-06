const FormRowSelect = (name, labelText, list, defaultValue = "") => {
    <div className='form-row'>
            <label htmlFor={name} className='form-label'>{labelText || name}</label>
            <select name="jobStatus" id=" jobStatus" className='form-select' defaultValue={JOB_STATUS.PENDING} >
              {list.map((status) => {
                <option key={status}  value={status}>{status}</option>
                })}
            </select>
          </div>
}
export default FormRowSelect