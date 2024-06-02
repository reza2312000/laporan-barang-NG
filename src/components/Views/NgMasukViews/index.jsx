const NgMasukViews = () => {
  return (
    <div className="w-4/5">
    <div className="p-3 mx-auto">
      <div className="container border rounded-xl p-2">
        <h1 className="font-bold">Input Data NG Masuk</h1>
        <hr className="my-2" />
        <div className="flex flex-col">
          <label>Nama Barang :</label>
          <input type="text" className="input input-bordered mt-1" />
        </div>
        <div className="flex flex-col mt-3">
          <label>Jumlah Barang :</label>
          <input type="number" className="input input-bordered mt-1" />
        </div>
        <hr className="my-4" />
        <div className="flex justify-end">
          <button className="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
    </div>
  );
};
export default NgMasukViews;
