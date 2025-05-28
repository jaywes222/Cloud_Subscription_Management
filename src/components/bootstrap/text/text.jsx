import React from "react";

const Text = () => {
    return (
        <div className="bs">
            <h5>Order Summary</h5>
            <h6>Order No:97XYrWE34</h6>
            <div className="thankyou-text">
                <p>Thank You For Your Purchase</p>
                <div className="thankyou-container">
                    <div className="item-row">
                        <p className="item-name">phAMACore Lite</p>
                        <p className="item-price">KES 0</p>
                    </div>
                    <div className="item-row">
                        <p className="item-name">eTims</p>
                        <p className="item-price">KES 0</p>
                    </div>
                    <div className="item-row">
                        <p className="item-name">Transaction Fee</p>
                        <p className="item-price">KES 0</p>
                    </div>
                    <div className="item-row">
                        <p className="item-name">Service Charge</p>
                        <p className="item-price">KES 0</p>
                    </div>

                    <hr />

                    <div className="item-row total-row">
                        <div className="item-name total-text">
                            <p
                                style={{
                                    fontSize: "14px",
                                    color: "black",
                                    lineHeight: 1.5,
                                    fontWeight: 500,
                                    margin: 0,
                                }}
                            >
                                Total
                            </p>
                        </div>

                        <div className="item-price total-text">
                            <p
                                style={{
                                    fontSize: "14px",
                                    color: "black",
                                    lineHeight: 1.5,
                                    fontWeight: 500,
                                    margin: 0,
                                }}
                            >
                                KES 0
                            </p>
                        </div>
                    </div>

                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "0.5rem",
                            fontSize: "14px",
                            color: "#737373",
                        }}
                    >
                        **This is an auto-generated receipt**
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Text;
