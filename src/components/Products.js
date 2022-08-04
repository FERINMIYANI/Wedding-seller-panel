import React, { useEffect, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import axios from 'axios'
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber'

const Products = () => {
    const toast = useRef(null);
    const [products, setProducts] = useState(null)
    const [i, setI] = useState(0)
    const [title, setTitle] = useState(null)
    const [charge, setCharge] = useState(null)
    const [updateImageDialog, setUpdateImageDialog] = useState(false)
    const [left, setLeft] = useState(null)
    const [updateId, setUpdateId] = useState(null)
    const [price, setPrice] = useState(null)
    const [sizeArray, setSizeArray] = useState()
    const [image, setImage] = useState({ preview: '', raw: '' })
    const [imageArray, setImageArray] = useState(null)
    const [size, setSize] = useState(null)
    const [displayEditDialog, setDisplayEditDialog] = useState(false)


    const allProducts = () => {
        axios.get(`http://localhost:3000/api/v1/seller/seller?id=${'62e90922db1af720ec57dfa5'}`).then((res) => {
            console.log(res.data.details.products);
            setProducts(res.data.details.products)
        }).catch((e) => {
            console.log(e);
        })
    }

    useEffect(() => {
        allProducts()
    }, [])


    const showUpdateImage = (details) => {
        setUpdateImageDialog(true)
        let arr = []
        details.images.map((ele) => {
            {
                let obj = {
                    raw: '',
                    preview: `http://localhost:3000/images/${ele}`
                }
                arr.push(obj)
            }
        })
        setImageArray(arr)
    }

    const imageBodyTemplate = (details) => {


        const nextHandler = () => {
            if (i != details.images.length - 1) {
                setI(i + 1)
            }
        }

        const preHandler = () => {
            if (i != 0) {
                setI(i - 1)
            }
        }

        return (
            <>
                <Toast ref={toast} />
                <div className='flex align-items-center justify-content-between'>
                    <Button label='Previous' onClick={preHandler} disabled={i === 0 ? true : false} className='mb-3 p-button-outlined p-button-primary' />
                    <Button label='Next' onClick={nextHandler} disabled={i === details.images.length - 1 ? true : false} className='mb-3 p-button-outlined p-button-primary' />
                </div>
                <a target='blank' href={`http://localhost:3000/images/${details.images[i]}`}><img src={`http://localhost:3000/images/${details.images[i]}`} width='100%'></img></a>
                <div className='flex align-items-center justify-content-center'>
                    <Button onClick={() => showUpdateImage(details)} className='p-button-outlined p-button-primary mt-3'>Update Images</Button>
                </div>
            </>
        )
    }

    const uploadImagesBackend = async () => {
        await axios.post(`http://localhost:3000/`)
    }

    const sizeBodyTemplate = (details) => {
        return details.size.map((e, i) => {
            if (i === details.size.length - 1) {
                return e
            }
            else {
                return e + ", "
            }
        })
    }

    const updateHandler = async () => {
        await axios.post(`http://localhost:3000/api/v1/seller/updateproduct?id=${updateId}`, { title, size: sizeArray, deliveryCharge: charge, productLeft: left, price }).then(async (res) => {
            toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Data Submitted', life: 4000 })
            setDisplayEditDialog(false)
            await allProducts()
        }).catch((e) => {
            console.log(e);
            return toast.current.show({ severity: 'error', summary: 'Bad Request', details: 'unsuccess' })
        })
    }

    const updateFooter = () => {
        return (
            <div>
                <Button onClick={updateHandler}>Update</Button>
                <Button onClick={hideEditDialog}>Discard</Button>
            </div>
        )
    }

    const updateImageFooter = () => {
        return (
            <div>
                <Button onClick={uploadImagesBackend}>Update</Button>
                <Button onClick={hideimageDialog}>Discard</Button>
            </div>
        )
    }

    const showEditDialog = (details) => {
        setDisplayEditDialog(true)
        setCharge(details.deliveryCharge)
        setLeft(details.productLeft)
        setPrice(details.price)
        setUpdateId(details._id)
        setTitle(details.title)
        setSizeArray(details.size)
    }

    const imageUploader = (e) => {
        setImage({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        })
    }

    const addImageHandler = () => {
        let arr = [...imageArray]
        arr.push(image)
        setImageArray(arr)
        
        setImage({preview: '', raw: ''})
    }

    const hideEditDialog = () => {
        setDisplayEditDialog(false)
        setCharge(null)
        setLeft(null)
        setPrice(null)
        setUpdateId(null)
        setTitle(null)
        setSizeArray(null)
    }

    const deleteImageHandler = (i) => {
        let arr = [...imageArray]
        arr.splice(i, 1)
        setImageArray(arr)
    }

    const hideimageDialog = () => {
        setUpdateImageDialog(false)
        setImageArray(null)
    }

    const deleteSize = (number) => {
        let arr = [...sizeArray]
        let ind = arr.findIndex(ele => ele === number)
        arr.splice(ind, 1)
        setSizeArray(arr)
    }

    const addSize = () => {
        let arr = [...sizeArray]
        if (size === null) {
            return toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Please Enter Number In Size', life: 3000 });
        }
        arr.push(size)
        setSize(null)
        setSizeArray(arr)
    }

    const actionBodyTemplate = (details) => {
        return (
            <div className='flex align-items-center justify-content-center flex-column'>
                <Button className='p-button-raised p-button-warning my-2 border-danger p-button-text' onClick={() => showEditDialog(details)}>Update</Button>
                <Button className='p-button-raised p-button-danger my-2 p-button-text'>Delete</Button>
            </div>
        )
    }


    return (
        <>
            <div className='card bg-white p-4'>
                <DataTable value={products}
                    dataKey="id" paginator rows={10} cols={4} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive p-datatable-gridlines p-3" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" emptyMessage="No products found." responsiveLayout="scroll">
                    <Column field="title" header="Title"></Column>
                    <Column field="price" header="Price ₹"></Column>
                    <Column body={imageBodyTemplate} headerStyle={{ width: '16rem' }} header="image"></Column>
                    <Column field="productLeft" header="Left"></Column>
                    <Column field="deliveryCharge" header="charge ₹"></Column>
                    <Column body={sizeBodyTemplate} header='Sizes' />
                    <Column body={actionBodyTemplate} header='Action' />
                </DataTable>

                <Dialog header="Update Product" visible={displayEditDialog} style={{ width: '30vw' }} footer={updateFooter} onHide={hideEditDialog}>
                    <div className='flex flex-column my-5 '>
                        <span className="p-float-label">
                            <InputText value={title} style={{ width: '100%' }} onChange={(e) => setTitle(e.target.value)} className={title ? 'border-danger' : 'p-invalid'} />
                            <label>Title</label>
                        </span>
                        <small id="username2-help" style={{ width: '100%' }} className={title ? 'd-none' : 'p-error block'}>Please Enter Title</small>
                    </div>

                    <div className='flex flex-column my-5'>
                        <span className="p-float-label">
                            <InputNumber value={left} style={{ width: '100%' }} onChange={(e) => setLeft(e.value)} className={left ? null : 'p-invalid'} />
                            <label>Products Left</label>
                        </span>
                        <small id="username2-help" style={{ width: '100%' }} className={left ? 'd-none' : 'p-error block'}>Please Enter Products Left</small>
                    </div>

                    <div className='flex flex-column my-5'>
                        <span className="p-float-label">
                            <InputNumber value={charge} style={{ width: '100%' }} currency="INR" mode="currency" onChange={(e) => setCharge(e.value)} className={charge ? null : 'p-invalid'} />
                            <label>Delivery Charge</label>
                        </span>
                        <small id="username2-help" className={charge ? 'd-none' : 'p-error block'}>Please Enter Delivery Charge</small>
                    </div>

                    <div className='flex flex-column my-5'>
                        <span className="p-float-label">
                            <InputNumber value={price} style={{ width: '100%' }} currency="INR" mode="currency" onChange={(e) => setPrice(e.value)} className={price ? null : 'p-invalid'} />
                            <label>Price ₹</label>
                        </span>
                        <small id="username2-help" className={price ? 'd-none' : 'p-error block'}>Please Enter Delivery price</small>
                    </div>

                    <div className='flex flex-column my-5'>
                        <span className='p-float-label '>
                            <InputNumber value={size} className={size ? null : 'p-invalid'} style={{ width: '100%' }} onChange={(e) => setSize(e.value)} />
                            <label>Size</label>
                        </span>
                        <small id="username2-help" className={size ? 'd-none' : 'p-error block'}>Please enter the integer</small>
                        <div className='flex  mt-2 justify-content-center'>
                            <Button onClick={addSize}>Add</Button>
                        </div>
                    </div>

                    <table width={'100%'}>
                        {
                            sizeArray ?
                                sizeArray.map((ele) => {
                                    return <tr align='center'>
                                        <td align='center'>{ele}</td>
                                        <td align='center'><Button onClick={() => deleteSize(ele)}>delete</Button></td>
                                    </tr>
                                })
                                : null
                        }
                    </table>
                </Dialog>

                <Dialog header="Update images" visible={updateImageDialog} style={{ width: '50vw' }} footer={updateImageFooter} onHide={hideimageDialog}>
                    {
                        image.preview && image.raw ?
                            <div className='flex flex-column align-items-center justify-content-center'>
                                <img src={image.preview} className='mb-4 border-danger' width='25%' />
                                <Button onClick={addImageHandler}>Add</Button>
                            </div>
                            : <div className='flex align-items-center justify-content-center my-5'>
                                <input type='file' onChange={(e) => imageUploader(e)} />
                            </div>
                    }
                    <table>
                        <tbody>

                            {
                                imageArray && imageArray.length ?
                                    imageArray.map((ele, i) => {
                                        return <tr key={ele+i}>
                                            <td><img src={ele.preview} width='50%' /></td>
                                            <td><Button onClick={() => deleteImageHandler(i)}>Delete</Button></td>
                                        </tr>
                                    })
                                    : null
                            }

                        </tbody>
                    </table>
                </Dialog>
            </div>
        </>
    )
}
export default Products