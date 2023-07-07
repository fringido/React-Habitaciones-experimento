import React, { useEffect, useState } from "react";
import "./Habitaciones.css";

interface Habitacion {
	numero: number;
	estado: string;
	tipo: string;
	tiempoRestante: string | undefined;
}

interface HabitacionesArray {
	tipo: string;
	totalHabitaciones:number;
	habitacion: Habitacion[];
}

const HabitacionesInfoComponent: React.FC = () => {
	const tiposDeHabitacion = [
		"Habitación individual",
		"Habitación doble",
		"Habitación doble deluxe",
		"Habitación ejecutiva",
		"Suite",
		"Habitación familiar",
	];

	// Generar un número aleatorio entre 4 y 6 (incluyendo ambos límites)
	const numTiposHabitacion = Math.floor(Math.random() * (4 - 2 + 1)) + 2;

	const [
		habitacionesbitacionesArray,
		setHabitacionesbitacionesArray,
	] = useState<HabitacionesArray[]>([]);


	useEffect(() => {
		const getRandomEstado = (): string => {
			const estados = ["Libre", "Manten...", "Sucia", "Ocupada", "Limpieza"];
			if (contadorHabitaciones > 20) {
				return estados[0];
			}
			const randomIndex = Math.floor(Math.random() * estados.length);
			return estados[randomIndex];
		};

		const getRandomTipo = (): string => {
			const randomIndex = Math.floor(Math.random() * numTiposHabitacion);
			return tiposDeHabitacion[randomIndex];
		};

		const getRandomTiempoRestante = (): string => {
			const padZero = (value: number): string =>
				value.toString().padStart(2, "0");

			const horas = Math.floor(Math.random() * 24);
			const minutos = Math.floor(Math.random() * 60);
			const segundos = Math.floor(Math.random() * 60);

			return `${padZero(horas)}:${padZero(minutos)}:${padZero(segundos)}`;
		};



		let contadorHabitaciones: number = 0;
		const generarHabitaciones = (): void => {
			const nuevasHabitaciones: Habitacion[] = [];
			for (let i = 1; i <= 50; i++) {
				contadorHabitaciones++;

				nuevasHabitaciones.push({
					numero: i + 100,
					estado: getRandomEstado(),
					tipo: getRandomTipo(),
					tiempoRestante: getRandomTiempoRestante(),
				});
			}

			getHabitacionesArray(nuevasHabitaciones);
		};
		
		const getHabitacionesArray = (
			habitaciones: Habitacion[]
		): void => {
			const getHabitacionesArray: HabitacionesArray[] = [];
			tiposDeHabitacion
				.filter(
					(a) =>
						habitaciones.filter((habitacion) => habitacion.tipo === a).length > 0
				)
				.forEach((tipo) => {
					getHabitacionesArray.push({
						tipo: tipo,
						totalHabitaciones: habitaciones.filter(
								(habitacion) => habitacion.tipo === tipo
						).length,
						habitacion: habitaciones.filter(
							(habitacion) => habitacion.tipo === tipo
						),
					});
				});
				getHabitacionesArray.sort((a,b) => b.totalHabitaciones - a.totalHabitaciones)
				
				columnasTotal(getHabitacionesArray)
				setHabitacionesbitacionesArray(getHabitacionesArray)
			};

			const columnasTotal = (habitacionesArray: HabitacionesArray[]): void => {
				
				setHabitacionesbitacionesArray(habitacionesArray)
			}
		
			
			generarHabitaciones();
			

	}, []);


	const getIconClass = (estado: string): string => {
		switch (estado) {
			case "Libre":
				return "far fa-check-circle";
			case "Manten...":
				return "fas fa-wrench";
			case "Sucia":
				return "fas fa-exclamation-triangle";
			case "Ocupada":
				return "fas fa-bed";
			case "Limpieza":
				return "fas fa-broom";
			default:
				return "fas fa-question-circle";
		}
	};

	const getCardColor = (estado: string): string => {
		switch (estado) {
			case "Libre":
				return "free"; /* Verde oscuro */
			case "Manten...":
				return "maintenance"; /* Naranja claro */
			case "Sucia":
				return "dirty"; /* Rojo oscuro */
			case "Ocupada":
				return "dirty"; /* Azul oscuro */
			case "Limpieza":
				return "cleaning"; /* Amarillo claro */
			default:
				return ""; /* Gris claro */
		}
	};

	const tiempoRestanteMenor10Minutos = (
		tiempoRestante: string | undefined,
		estado: string
	): boolean => {
		const tiempoArray = tiempoRestante?.split(":") || [];
		const horas = parseInt(tiempoArray[0]);
		const minutos = parseInt(tiempoArray[1]);
		// const segundos = parseInt(tiempoArray[2]);

		return horas === 0 && minutos <= 10 && estado === "Ocupada";
	};

	const calcularPorcentajeHabitaciones = (total: number): number => {
		let totalTodasHabitaciones: number = 0;
		
		habitacionesbitacionesArray.forEach((habitacionesArray) => {
			totalTodasHabitaciones = habitacionesArray.totalHabitaciones + totalTodasHabitaciones;
		})

		return (total * 100) / totalTodasHabitaciones;
	
	}


	const getWith = (total:number, indice:number): string => {
		const porcentaje = calcularPorcentajeHabitaciones(total)
		if(habitacionesbitacionesArray.length == 4){
			if(calcularPorcentajeHabitaciones(habitacionesbitacionesArray[3].totalHabitaciones) < 20 ) {
				if(indice === 0 || indice === 1 || indice === 2){
					if(porcentaje < 15){
						return `18%`
					}
					if(porcentaje < 25){
						return `25%`
					}
					return `${porcentaje+(1*indice)}%`
				}
				return "66%"
			}
		}

		if(habitacionesbitacionesArray.length == 3){
		if(porcentaje >= 60 && indice === 0){
			return "100%"
		}
		if (calcularPorcentajeHabitaciones(habitacionesbitacionesArray[0].totalHabitaciones) >= 50){
			return `${(porcentaje-1)*2}%`
		}
		return `${porcentaje-3+(indice)}%`
		}

		if(habitacionesbitacionesArray.length === 2){
				return `${porcentaje-4}%`
		}	

		if(indice === 0){
			if(habitacionesbitacionesArray.length == 1){
				return "100%"
			}
			if(porcentaje > 50){
				return "100%"
			}
			if(porcentaje >= 40){

				return `${porcentaje-2}%`
			}
		}
	return `${porcentaje-2}%`
	}



	return (
		<div>
			<h1>Administración de Habitaciones</h1>
			<div className="room-groups">
			
					{ habitacionesbitacionesArray
						.map((habitacionesArray , i) => (
							<div className="room-group" key={habitacionesArray.tipo}
							style={ {width: getWith(habitacionesArray.totalHabitaciones , i) }}

							>
								<div className="infoTipoHabitacion">
								<h2 className="titulo-tipo__habitacion">
									{habitacionesArray.tipo}
								</h2>
								<div className="boton-estado">
									<i className="far fa-check-circle " style={{color: "#37c556"}}>
									&nbsp;
									{habitacionesArray.habitacion.filter((habitacion) => habitacion.estado === "Libre").length}
									</i>
									<i className="fas fa-wrench" style={{color: "#ffa500"}}>
									&nbsp;
									{habitacionesArray.habitacion.filter((habitacion) => habitacion.estado === "Sucia").length}
									</i>
									<i className="fas fa-bed" style={{color: "#c70039"}}>
									&nbsp;
									{habitacionesArray.habitacion.filter((habitacion) => habitacion.estado === "Ocupada").length}
									</i>
									<i className="fas fa-exclamation-triangle" style={{color: "#5f0303"}}>
									&nbsp;
									{habitacionesArray.habitacion.filter((habitacion) => habitacion.estado === "Manten...").length}
									</i>
									<i className="fas fa-exclamation-triangle" style={{color: "#c70039"}}>
									&nbsp;
									{habitacionesArray.habitacion.filter((habitacion) => habitacion.estado === "Sucia").length}
									</i>
									<i className="fas fa-exclamation-triangle" style={{color: "rgb(255, 225, 0)"}}>
									&nbsp;
									{habitacionesArray.habitacion.filter((habitacion) => habitacion.estado === "Limpieza").length}
									</i>
								</div>
								</div>
								<div className="room-grid">
									{habitacionesArray.habitacion.map((habitacion ) => (
										<div
											className={`room ${
												tiempoRestanteMenor10Minutos(
													habitacion.tiempoRestante,
													habitacion.estado
												)
													? "countdown"
													: ""
											} ${getCardColor(habitacion.estado)}`}
											key={habitacion.numero}
										>
											<div className="room-info">
											<i
												className={` ${getIconClass(
													habitacion.estado
												)}`}
											/>
												<p className="room-number">{habitacion.numero}</p>{" "}
											</div>
											<div className="status-icon">
													<p className="room-status">{habitacion.estado}</p>
												<div className="icon-status_container">
												</div>
												{habitacion.tiempoRestante && (
													<div
														className={`icon-time ${
															tiempoRestanteMenor10Minutos(
																habitacion.tiempoRestante,
																habitacion.estado
															)
																? "countdown"
																: ""
														}`}
													>
														<p className="room-time">
															{habitacion.tiempoRestante}
														</p>
													</div>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						))}
			</div>
		</div>
	);
};

export default HabitacionesInfoComponent;
