const express = require("express");
const MercadoPago = require("mercadopago");
const app = express();

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-3913081206787480-120318-f8d28d149e59f939281568c4cd858bc2-1254410640"
  });

  app.get("/comprar", (req, res) => {
    res.send("Olá mundo")
  });

  var id = "" + Date.now()
  var emailDoPagador = "rafale@gmail.com"  

  app.get("/pagar", async (req, res) => {

    var dados = {
        items: [
            item = {
                id: id,
                title: "2x video games",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(20)
            }
        ],
        payer:{
            email: emailDoPagador 
        },
        external_reference: id,
    }

    try {
        var pagamento = await MercadoPago.preferences.create(dados);
        console.log(pagamento)
        return res.redirect(pagamento.body.init_point)
    } catch(err) {
      return res.send(err.message);
    }


  })

  app.listen(3000,(req, res) => {
    console.log("Servidor rodando")
  });