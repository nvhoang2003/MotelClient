import React, { useEffect, useState } from 'react'
import { getMotelById } from '../../../../dataProvider/agent';


export default function page({params}) {
    const [value, setValue] = useState();

    const fetchPost = async () => {
        try {
            const res = await getMotelById(params.id);
            console.log(res)
            if (res.status < 400) {
                setValue(res.data.content);
            } else {
                snackbarUtil.error("Can't get the data");
            }
        } catch (error) {
            snackbarUtil.error(error)
        }
    }

    useEffect(() => {
        if(params.id){
            fetchData()
        }
    }, [params.id])
console.log(value)
  return (
    <div>page</div>
  )
}
